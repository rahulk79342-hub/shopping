const promotion = {
  name: 'promotion',
  title: 'Promotion',
  type: 'document',
  fields: [
    {
      name: 'code',
      title: 'Discount Code',
      type: 'string',
    },
    {
      name: 'discountType',
      title: 'Discount Type',
      type: 'string',
      options: {
        list: [
          { title: 'Percentage', value: 'percentage' },
          { title: 'Fixed Amount', value: 'fixed' }
        ],
      }
    },
    {
      name: 'amount',
      title: 'Discount Amount',
      type: 'number',
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true
    }
  ]
};

const product = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } },
    { name: 'price', title: 'Price', type: 'number' },
    { name: 'inventory', title: 'Inventory Count', type: 'number' }
  ]
};

export const schemaTypes = [promotion, product];
