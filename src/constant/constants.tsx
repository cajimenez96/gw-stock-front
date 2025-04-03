import { Tag } from 'antd';

const statusColor = {
  'PENDING': 'orange',
  'ACTIVE': 'green',
  'BLOCK': 'volcano'
} as const;

export const allUsersColumns = (t: any) => [
  {
    title: t('all_user.table.name'),
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: t('all_user.table.email'),
    dataIndex: 'email',
    key: 'email',
  },
  // {
  //   title: 'title',
  //   dataIndex: 'title',
  //   key: 'title',
  // },
  // {
  //   title: 'description',
  //   dataIndex: 'description',
  //   key: 'description',
  // },
  {
    title: t('all_user.table.phone'),
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: t('all_user.table.address'),
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: t('all_user.table.city'),
    dataIndex: 'city',
    key: 'city',
  },
  {
    title: t('all_user.table.role'),
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: t('all_user.table.status'),
    dataIndex: 'status',
    key: 'status',
    render: (item: 'ACTIVE' | 'PENDING' | 'BLOCK') => {
      return (
        <Tag key={item} color={statusColor[item]}>
          {item}
        </Tag>
      )
    }
  },
];