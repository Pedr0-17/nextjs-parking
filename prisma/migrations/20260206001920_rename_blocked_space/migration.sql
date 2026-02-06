/*
  Warnings:

  - You are about to drop the `BlockedSpace` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BlockedSpace";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ParkingBlock" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "spaceNumber" INTEGER NOT NULL,
    "blockedBy" INTEGER NOT NULL,
    "blockedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ParkingBlock_blockedBy_fkey" FOREIGN KEY ("blockedBy") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ParkingBlock_spaceNumber_key" ON "ParkingBlock"("spaceNumber");

-- CreateIndex
CREATE INDEX "ParkingBlock_spaceNumber_idx" ON "ParkingBlock"("spaceNumber");
