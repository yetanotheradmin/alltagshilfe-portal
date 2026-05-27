/**
 * Zeigt eine Fehlermeldung bei einem Formularfeld an.
 * role="alert" sorgt dafür, dass Screenreader die
 * Fehlermeldung sofort vorlesen.
 */
export default function FormError({ message }) {
  if (!message) return null;
  return (
    <p role="alert" style={{ color: '#d32f2f', fontSize: '0.875rem', marginTop: '4px' }}>
      {message}
    </p>
  );
}
