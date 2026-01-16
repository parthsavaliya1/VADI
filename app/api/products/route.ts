import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { insertProductSchema, Product } from "@/schema/schema";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();

  //   const parsed = insertProductSchema.safeParse(body);
  //   if (!parsed.success) {
  //     return NextResponse.json(
  //       { message: "Invalid input", field: parsed.error.errors[0].path[0] },
  //       { status: 400 }
  //     );
  //   }

  //   const { data, error } = await supabase
  //     .from<Product>("products")
  //     .insert(parsed.data)
  //     .select()
  //     .single();

  //   if (error) {
  //     return NextResponse.json({ message: error.message }, { status: 500 });
  //   }

  //   return NextResponse.json(data, { status: 201 });
}
