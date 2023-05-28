interface IErrorProps {
  message: string
}

const Error = (props: IErrorProps) => {
  return (
    <div className="error">
      <h3 className="error__title">Oops, something went wrong</h3>
      <h5 className="error__desc">{props.message}</h5>
    </div>
  )
}

export default Error
