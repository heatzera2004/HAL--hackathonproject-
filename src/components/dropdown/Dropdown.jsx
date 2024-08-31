import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from '@heroicons/react/16/solid'
import { useNavigate } from 'react-router-dom'

export default function Dropdown() {

    const navigate = useNavigate();
  return (
    <div>
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-green-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          Options
          <ChevronDownIcon className="size-4 fill-black/60" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border border-white/5 bg-white p-1 text-sm text-black transition duration-100 ease-out focus:outline-none"
        >
          <MenuItem>
            <button onClick={() => navigate('/edit')} className="group flex font-semibold	 w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              Edit
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘E</kbd>
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group flex font-semibold w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              Duplicate
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘D</kbd>
            </button>
          </MenuItem>
          <div className="my-1 h-px bg-white/5" />
          <MenuItem>
            <button className="group flex font-semibold w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              Archive
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘A</kbd>
            </button>
          </MenuItem>
          <MenuItem>
            <button className="group flex font-semibold w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              Delete
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘D</kbd>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  )
}