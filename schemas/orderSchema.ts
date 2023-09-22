interface Product {
  category_id: string | null;
  description: string;
  id: string | null;
  picture_url: string;
  quantity: string;
  title: string;
  unit_price: string;
}

interface Shipment {
  city_name: string;
  state_name: string;
  street_name: string;
  street_number: string;
  zip_code: string;
}

interface Address {
  street_name: string;
  street_number: string;
}

interface Payer {
  address: Address;
  first_name: string;
  last_name: string;
  email:string
}

export interface PropOrder {
  products: Product[];
  shipments: Shipment;
  payer: Payer;
  paymentStatus: string;
  _id:string
}


// export interface orderProp {
//   shipping: shippingProp;
//   products: productsProp[];
//   billing: billingProp;
//   user: { email: string };
//   result: {
//     response: {
//       id: string;
//     };
//   };
//   status: Status;
 
// }
// enum Status {
//   Pending = "pending",
//   Success = "success",
//   Cancel = "cancel",
// }

// interface billingProp {
//   name: string;
//   surname: string;
//   phone_area_code: string;
//   phone_num: string;

//   identification_type: string;
//   identification_num: string;

//   zip_code: string;
//   street_name: string;
//   street_number: string;
// }

// interface shippingProp {
//   name: string;
//   surname: string;

//   phone_number: string;
//   phone_area_code: string;

//   province: string;
//   city: string;
//   street_name: string;
//   street_number: string;
//   zip_code: string;
//   floor: string;
//   department: string;
//   observations: string;
// }

// interface productsProp {
//   price: number;
//   title: string;
//   isNew: boolean;
//   id: string | never;
//   img: any;
//   quantity: number;
//   description: string;
// }
