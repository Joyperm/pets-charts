import { NextResponse } from "next/server";
import { mysqlPool } from "@/utiles/db";

export async function GET(request) {
    const promisePool = mysqlPool.promise()
    const [rows, fields] = await promisePool.query(
        `SELECT * FROM pets;`
    )
    return NextResponse.json(rows)
}