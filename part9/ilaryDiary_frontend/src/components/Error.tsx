interface Props {
  error?: string;
}

const ErrorMessage = ({ error }: Props) => {
  if (!error) return null;
  return <div style={{color: "red", marginBottom: "30px"}}>{error}</div>;
}

export default ErrorMessage
