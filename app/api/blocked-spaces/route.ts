import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const blocked = await prisma.parkingBlock.findMany({
      include: { admin: { select: { id: true, name: true } } },
    });

    const result = blocked.map((b) => ({
      spaceNumber: b.spaceNumber,
      blockedBy: b.blockedBy,
      blockedByName: b.admin.name,
      blockedAt: b.blockedAt,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching blocked spaces:', error);
    console.error('Stack:', (error as any).stack);
    return NextResponse.json({ error: 'Error fetching blocked spaces', details: String(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { spaceNumber, blockedBy } = await request.json();
    if (!spaceNumber || !blockedBy) {
      return NextResponse.json({ error: 'spaceNumber and blockedBy required' }, { status: 400 });
    }

    // Create or replace
    const existing = await prisma.parkingBlock.findUnique({ where: { spaceNumber } as any });
    if (existing) {
      // already blocked
      return NextResponse.json({ message: 'Already blocked' }, { status: 200 });
    }

    const created = await prisma.parkingBlock.create({
      data: {
        spaceNumber,
        blockedBy,
      },
      include: { admin: { select: { id: true, name: true } } },
    });

    return NextResponse.json({
      spaceNumber: created.spaceNumber,
      blockedBy: created.blockedBy,
      blockedByName: created.admin.name,
      blockedAt: created.blockedAt,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating blocked space:', error);
    return NextResponse.json({ error: 'Error creating blocked space' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const space = searchParams.get('spaceNumber');
    if (!space) {
      return NextResponse.json({ error: 'spaceNumber required' }, { status: 400 });
    }

    const spaceNumber = parseInt(space);
    await prisma.parkingBlock.deleteMany({ where: { spaceNumber } });

    return NextResponse.json({ message: 'Unblocked' });
  } catch (error) {
    console.error('Error deleting blocked space:', error);
    return NextResponse.json({ error: 'Error deleting blocked space' }, { status: 500 });
  }
}
