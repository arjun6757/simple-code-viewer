export default function ModalItem({ data, url, itemPress }) {

  return (
    <a 
    onKeyDown={(k) => {
      if(k.key==='Enter'){
        itemPress(data)
      }
      return
    }}
    onClick={(c) => {
      c.preventDefault()
      itemPress(data)
    }}
     tabIndex={0} className="block px-4 py-2 w-full h-full">
      {data}
    </a>
  );
}