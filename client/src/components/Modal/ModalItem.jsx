export default function ModalItem({ data, url, itemPress }) {

  const handleClick = (e, data) => {
    e.preventDefault()
    itemPress(data)
  }

  return (
    <a onClick={(e) => handleClick(e, data)} tabIndex={-1} href={url} className="block w-full h-full">
      {data}
    </a>
  );
}