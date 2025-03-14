import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: payments=[] } = useQuery({
        queryKey: ["payments", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment/${user.email}`);
            console.log(res.data);
            return res.data;
        }
    })
    return (
      <div>
        <h1>Total Payments:{payments?.length}</h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Price</th>
                <th>TransactionId</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={PaymentMethodChangeEvent._id}>
                  <th>
                    {index+1}
                  </th>
                  <td>
                    {payment.email}
                  </td>
                  <td>
                    {payment.price}
                  </td>
                  <td>{ payment.transactionId}</td>
                  <td>{ payment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default PaymentHistory;