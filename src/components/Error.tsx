const Error = (error: string) => {
  return (
    <div className="error">
      <h3 className="error__title">Oops, something went wrong</h3>
      <h5 className="error__desc">{error}</h5>
    </div>
  )
}

export default Error
