import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";
export default async function FeesPage() {
  const fees = await sql`
    SELECT
      fs.title,
      fs.term_label,
      fs.year,
      fi.class_name,
      fi.item_name,
      fi.amount,
      fi.currency
    FROM fee_items fi
    JOIN fee_structures fs ON fi.fee_structure_id = fs.id
    WHERE fs.status = 'active'
    ORDER BY fi.class_name ASC
  `;

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">School Fees</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Class</th>
            <th className="border p-2">Item</th>
            <th className="border p-2">Amount</th>
          </tr>
        </thead>

        <tbody>
          {fees.map((fee: any, index: number) => (
            <tr key={index}>
              <td className="border p-2">{fee.class_name}</td>
              <td className="border p-2">{fee.item_name}</td>
              <td className="border p-2">{fee.currency} {fee.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
