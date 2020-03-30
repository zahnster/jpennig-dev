import { Component } from 'react'
import Head from 'next/head'

import PlaybackControls from '../components/PlaybackControls'
import Lockup from '../components/Lockup'

// const placeholderLockup = {
//   title: ''
// }

const myPlaylist = 'pl.u-dYK2fRMRlM'

class IndexPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      music: null,
      analyzer: null,
      dataArray: null,
      isPlaying: false,
      playlistSummary: null
    }

    this.startMusicKit = this.startMusicKit.bind(this)
    this.updateFrame = this.updateFrame.bind(this)
    this.setIsPlaying = this.setIsPlaying.bind(this)

    this.onPlay = this.onPlay.bind(this)
    this.onPause = this.onPause.bind(this)
    this.onNext = this.onNext.bind(this)
  }

  componentDidMount() {
    // detect and instantiate MusicKit
    MusicKit ? this.startMusicKit() : null // todo: if not loaded, add loaded event listener
  }

  startMusicKit() {
    MusicKit.configure({
      developerToken: process.env.musicToken,
      app: {
        name: 'JP',
        build: '1978.4.1'
      }
    })

    const music = MusicKit.getInstance()
    this.setState({ music })

    music.setQueue({
      playlist: myPlaylist
    })

    music.api
      .playlist(myPlaylist)
      .then(playlist => this.setState({ playlistSummary: playlist.attributes }))
  }

  updateFrame() {
    const { analyzer, dataArray, isPlaying } = this.state

    // analyzer.getByteTimeDomainData(dataArray)
    analyzer.getByteFrequencyData(dataArray)
    this.setState({ dataArray })

    if (isPlaying) {
      requestAnimationFrame(this.updateFrame)
    }
  }

  setIsPlaying() {
    this.setState({ isPlaying: true })
    setTimeout(this.updateFrame, 100)
  }

  onPlay() {
    const { music } = this.state

    music.play().then(() => {
      const { analyzer } = this.state

      if (!analyzer) {
        // setup analyzer
        const audioTag = document.querySelector('audio')
        const audioContext = new AudioContext()
        const audioMES = audioContext.createMediaElementSource(audioTag)
        audioMES.connect(audioContext.destination)

        const analyzer = audioContext.createAnalyser()
        audioMES.connect(analyzer)
        analyzer.fftSize = 2048

        const bufferLength = analyzer.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)

        // save to state
        this.setState({ analyzer, dataArray })
      }

      this.setIsPlaying()
    })
  }

  onPause() {
    this.state.music.pause()
    this.setState({ isPlaying: false })
  }

  onNext() {
    this.state.music.player.skipToNextItem()
    this.setIsPlaying()
  }

  render() {
    const { dataArray, music, playlistSummary } = this.state

    const lockupData = music
      ? music.player.nowPlayingItem || playlistSummary || {}
      : {
          title: 'Loading'
        }

    const sampleData = [
      50,
      100,
      150,
      200,
      250,
      300,
      350,
      400,
      450,
      500,
      550,
      600,
      650,
      700,
      750,
      800,
      850,
      900,
      950,
      1000
    ]

    return (
      <div className="app">
        <Head>
          <script src="https://js-cdn.music.apple.com/musickit/v1/musickit.js" />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap"
            rel="stylesheet"
          />
        </Head>

        <div className="layout">
          <div className="playback">
            {dataArray ? (
              <>
                {sampleData.map((sample, i) => (
                  <div key={`data-${i}`} className="playback-bar">
                    <div
                      className="playback-bar-fill"
                      style={{ height: dataArray[sample] }}
                    />
                  </div>
                ))}
              </>
            ) : null}
          </div>

          {music ? <Lockup lockup={lockupData} /> : null}
        </div>

        <PlaybackControls
          onPlay={this.onPlay}
          onPause={this.onPause}
          onNext={this.onNext}
        />

        <style jsx>{`
          .app {
            padding: 1rem;
          }

          .layout {
            display: flex;
          }

          .playback {
            flex: 1;
            display: flex;
            position: relative;
            margin-bottom: 1rem;
            height: 250px;
            box-shadow: inset 0 0 14px rgba(0, 0, 0, 0.08);
            margin-right: 1rem;
          }

          .playback-bar {
            position: relative;
            height: 250px;
            width: 5%;
          }

          .playback-bar-fill {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 1px;
            background: linear-gradient(
              to top,
              #05333d,
              #028377 75px,
              #03e84e 150px
            );
            border-left: 1px solid #99cffe;
            border-right: 1px solid #99cffe;
          }
        `}</style>

        <style jsx global>{`
          * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
          }

          html {
            font-size: 19px;
          }

          @media (min-width: 768px) {
            html {
              font-size: 16px;
            }
          }

          body {
            font-family: 'Roboto Slab', serif;
          }
        `}</style>
      </div>
    )
  }
}

export default IndexPage
