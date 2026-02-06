import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const days = searchParams.get('days') || '7';

    const daysNum = parseInt(days);
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - daysNum);

    const where: any = {
      createdAt: {
        gte: dateFrom,
      },
    };

    if (userId) {
      where.userId = parseInt(userId);
    }

    const history = await prisma.parkingHistory.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            pin: true,
          },
        },
      },
      orderBy: {
        checkIn: 'desc',
      },
    });

    return NextResponse.json(history);
  } catch (error) {
    console.error("Error fetching history:", error);
    return NextResponse.json(
      { error: 'Error fetching history' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, spaceNumber, checkOut, forceCheckout } = await request.json();

    // Si envía checkOut, es para registrar una salida
    if (checkOut) {
      let history;

      if (forceCheckout) {
        // Check-out forzado por admin: buscar por spaceNumber sin importar userId
        history = await prisma.parkingHistory.findFirst({
          where: {
            spaceNumber,
            checkOut: null,
          },
        });
      } else {
        // Check-out normal: buscar por userId y spaceNumber
        history = await prisma.parkingHistory.findFirst({
          where: {
            userId,
            spaceNumber,
            checkOut: null,
          },
        });
      }

      if (!history) {
        return NextResponse.json(
          { error: "No active parking session found" },
          { status: 404 }
        );
      }

      const checkOutTime = new Date(checkOut);
      const duration = Math.round(
        (checkOutTime.getTime() - history.checkIn.getTime()) / (1000 * 60)
      );

      const updated = await prisma.parkingHistory.update({
        where: { id: history.id },
        data: {
          checkOut: checkOutTime,
          duration,
        },
        include: {
          user: true,
        },
      });

      return NextResponse.json(updated);
    }

    // Crear nuevo registro de estacionamiento
    const newHistory = await prisma.parkingHistory.create({
      data: {
        userId,
        spaceNumber,
        checkIn: new Date(),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            pin: true,
          },
        },
      },
    });

    return NextResponse.json(newHistory, { status: 201 });
  } catch (error) {
    console.error("Error creating history:", error);
    return NextResponse.json(
      { error: 'Error creating history' },
      { status: 500 }
    );
  }
}
