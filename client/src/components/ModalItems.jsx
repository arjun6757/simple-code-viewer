import ModalItem from "./ModalItem";

export default function ModalItems({ items }) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, index) => (
        <ModalItem
          defaultIndex={0}
          index={index}
          data={item.node.name}
          url={item.node.url}
          key={index}
        />
      ))}
    </div>
  );
}
