interface Props {
  error: string;
}

const ErrorMessage = ({ error }: Props) => {
  return <div style={{color: "red", marginBottom: "30px"}}>{error}</div>
}

export default ErrorMessage
