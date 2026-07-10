import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  const rows = await sql`
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
    ORDER BY fi.class_name ASC, fi.item_name ASC
  `;

  return NextResponse.json(rows);
}
