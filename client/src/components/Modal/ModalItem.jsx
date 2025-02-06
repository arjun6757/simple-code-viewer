export default function ModalItem({ data, url }) {
  return (
    <a tabIndex={-1} href={url} className="block w-full h-full">
      {data}
    </a>
  );
}