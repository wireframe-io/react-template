import {
  PencilSquareIcon,
  RectangleGroupIcon
} from '@heroicons/react/24/outline';

export const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/apps/reader`;

export const navigation = [
  {
    name: 'Read',
    href: '/read',
    hasDropdown: false,
  },
  {
    name: 'Notes',
    href: '/notes',
    hasDropdown: false,
    sub: [
      { name: 'Dashboard', href: '', icon: RectangleGroupIcon },
      { name: 'Sermons', href: '/sermons', icon: PencilSquareIcon },
    ],
  },
]