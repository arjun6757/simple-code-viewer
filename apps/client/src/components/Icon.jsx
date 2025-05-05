import {
  CiFileOn as FileIcon,
  CiFolderOn as FolderIcon
} from "react-icons/ci";

export default function Icon({ name, type }) {

  const getIcon = (name, type) => {
    if (type === "dir") {
      return <FolderIcon />;
    } else {
      return <FileIcon />
    }
  };

  return getIcon(name, type);
}
