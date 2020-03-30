import { Component } from 'react'
import Head from 'next/head'

class IndexPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      analyzer: null,
      dataArray: null,
      isPlaying: false
    }

    this.startMusicKit = this.startMusicKit.bind(this)
    this.onPlay = this.onPlay.bind(this)
    this.onPause = this.onPause.bind(this)
    this.onNext = this.onNext.bind(this)
    this.updateFrame = this.updateFrame.bind(this)
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

    MusicKit.getInstance().setQueue({
      playlist: 'pl.u-dYK2fRMRlM'
    })
  }

  onPlay() {
    const music = MusicKit.getInstance()

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

      this.setState({ isPlaying: true })
      this.updateFrame()
    })
  }

  onPause() {
    MusicKit.getInstance().pause()
    this.setState({ isPlaying: false })
  }

  onNext() {
    MusicKit.getInstance().player.skipToNextItem()
  }

  updateFrame() {
    const { analyzer, dataArray, isPlaying } = this.state

    // analyzer.getByteTimeDomainData(dataArray)
    analyzer.getByteFrequencyData(dataArray)

    // const dataArray2 = new Uint8Array()
    // analyzer.getFloatFrequencyData(dataArray2)
    // console.log(dataArray2)

    this.setState({ dataArray })

    if (isPlaying) {
      // recursion
      requestAnimationFrame(this.updateFrame)
    }
  }

  render() {
    const { dataArray } = this.state
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
      <div>
        <Head>
          <script src="https://js-cdn.music.apple.com/musickit/v1/musickit.js"></script>
        </Head>

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

        <div>
          <button className="button" onClick={this.onPlay}>
            Play
          </button>
          <button className="button" onClick={this.onPause}>
            Pause
          </button>
          <button className="button" onClick={this.onNext}>
            Next
          </button>
        </div>

        <style jsx>{`
          .playback {
            display: flex;
            position: relative;
            margin-bottom: 1rem;
            height: 250px;
          }

          .playback-bar {
            position: relative;
            height: 250px;
            width: 5%;
          }

          .playback-bar:not(:first-child) {
            margin-left: -1px;
          }

          .playback-bar-fill {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            background: #1199ef;
            border-left: 1px solid #99cffe;
            border-right: 1px solid #99cffe;
          }

          .button {
          }
        `}</style>
      </div>
    )
  }
}

export default IndexPage
