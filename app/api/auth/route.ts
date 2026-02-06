import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { pin } = await request.json();

    if (!pin || pin.length !== 4) {
      return NextResponse.json(
        { success: false, message: 'Invalid PIN' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { pin },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid PIN' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Authentication successful',
        user: {
          id: user.id,
          name: user.name,
          pin: user.pin,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
