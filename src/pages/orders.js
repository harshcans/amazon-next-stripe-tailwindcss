import Header from "../components/Header";
import { useSession, getSession } from "next-auth/client";
import moment from "moment";
import db from "../../firebase.js";
import image from "next/image";
import Head from "next/head";
import OrderItems from "../components/OrderItems";

function Orders({ orders }) {
  const [session] = useSession();

  console.log(' your order has been compiled');

  return (
    <div>
      <Header />
      <Head>
        <title>Your Orders </title>
      </Head>
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>

        {session ? ( <h2>{orders.length} Orders</h2> ) : ( <h2> Please Sign IN </h2> )}

        <div className="mt-5 space-y-4">
          {orders?.map(
            ({ id, amount, items, timestamp, images }) => (
              <OrderItems
                key={id}
                id={id}
                amount={amount}
                items={items}
                timestamp={timestamp}
                images={images}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
}

export default Orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }


   // Firebase db
  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy('timestamp', 'desc')
    .get();


    // Stripe orders
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      // items: (
      //   await stripe.checkout.sessions.listLineItems(order.id, {
      //     limit: 100,
      //   })
      // ).data,
    }))
  );

  return {
    props: {
      orders,
    },
  };
}
