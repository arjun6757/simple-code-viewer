import {
  CiFileOn as FileIcon,
  CiFolderOn as FolderIcon
} from "react-icons/ci";

export default function Icon({ root, type }: { root: boolean, type: string }) {
  if(root) return null;
  return type==="dir" ? <FolderIcon /> : <FileIcon />;
}