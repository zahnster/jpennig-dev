export default props => {
  const { lockup } = props

  return (
    <div className="lockup">
      {lockup.artwork ? (
        <img
          className="artwork"
          src="https://is1-ssl.mzstatic.com/image/thumb/JLEA4gdJ9E2Dl37MwoFJkQ/400x400bb.jpeg"
          alt={`Song: ${lockup.title}, by ${lockup.artistName}`}
        />
      ) : null}

      <p>{lockup.title}</p>
      <p>{lockup.artistName}</p>

      <style jsx>{`
        .lockup {
          width: 33%;
          max-width: 400px;
          min-width: 150px;
          text-align: center;
        }

        .artwork {
          width: 100%;
        }
      `}</style>
    </div>
  )
}
