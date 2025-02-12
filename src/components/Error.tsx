
interface ErrorProps {
  message: string | string[];
}

function Error({ message }: ErrorProps) {
  if (!message || (Array.isArray(message) && message.length === 0)) return null;

  // Si `message` es un array de errores, mostramos cada uno en un <li>.
  if (Array.isArray(message)) {
    return (
      <ul className="text-red-500 text-sm list-disc ml-5">
        {message.map((err, idx) => (
          <li key={idx}>{err}</li>
        ))}
      </ul>
    );
  }

  // Si es un string, lo mostramos tal cual.
  return <div className="text-red-500 text-sm">{message}</div>;
}

export default Error;