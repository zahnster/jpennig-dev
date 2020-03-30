export default props => {
  return (
    <div className="controls">
      <button className="button" onClick={props.onPlay}>
        Play
      </button>
      <button className="button" onClick={props.onPause}>
        Pause
      </button>
      <button className="button" onClick={props.onNext}>
        Next
      </button>

      <style jsx>{`
        .controls {
          margin: 1.5rem 0;
        }

        .button {
          -webkit-appearance: none;
          border: none;
          font-family: 'Roboto Slab';
          font-size: 1rem;
          margin-right: 0.5rem;
          background: #fff;
          padding: 0.25rem 0.5rem;
        }
      `}</style>
    </div>
  )
}
