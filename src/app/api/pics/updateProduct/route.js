import { NextResponse } from "next/server";
import { connect } from "../../../dbConfig/dbConfig";
import { Picture } from "../../../models/picModel";

const POST = async (req) => {
  await connect();

  const headers = req.headers;

  const data = await req.json();
  const key = Object.keys(data)[1];

  // try {
  const query = { id: data.id };

  // const res = await Picture.findOne(query)
  const res = await Picture.findOneAndUpdate(query, { [key]: data[key] });
  return NextResponse.json(
    {
      result: "success",
      message: "update successful",
      id: data.id,
      [key]: data[key],
      key: [key],
      headers: headers,
    },
    { status: 200 }
  );
};
export { POST };
