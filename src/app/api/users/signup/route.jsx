import { NextResponse } from "next/server";
import { connect } from "../../../dbConfig/dbConfig";
import { User } from "../../../models/userModel";

const POST = async (req) => {
  const headers = req.headers;

  const db = await connect();
  const data = await req.json();
  const updatedData = { ...data, shoppingCard: [], sales: [] };

  const userCollection = await db.collection("users");
  const user = await userCollection.findOne(
    { email: data.email },
    { projection: { password: 0 } } //excludes the password
  );

  if (user) {
    return NextResponse.json(
      {
        result: "error",
        message: "Der Nutzer ist bereits vorhanden",
        headers: headers,
      },
      { status: 200 }
    );
  }

  try {
    new User(updatedData).save();

    return NextResponse.json(
      {
        result: "success",
        message: "Nutzer wurde erfolgreich gespeichert",
        headers: headers,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
  }
};
export { POST };
