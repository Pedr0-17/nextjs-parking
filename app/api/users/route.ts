import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        pin: true,
        name: true,
        email: true,
        isAdmin: true,
        createdAt: true,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { pin, name, email, isAdmin } = await request.json();

    // Validar que el PIN sea único y tenga 4 dígitos
    if (!pin || pin.length !== 4) {
      return NextResponse.json(
        { error: "PIN must be 4 digits" },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { pin },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "PIN already exists" },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: {
        pin,
        name,
        email: email || null,
        isAdmin: isAdmin || false,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
