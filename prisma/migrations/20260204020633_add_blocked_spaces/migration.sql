-- CreateTable
CREATE TABLE "BlockedSpace" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "spaceNumber" INTEGER NOT NULL,
    "blockedBy" INTEGER NOT NULL,
    "blockedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "BlockedSpace_blockedBy_fkey" FOREIGN KEY ("blockedBy") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "BlockedSpace_spaceNumber_key" ON "BlockedSpace"("spaceNumber");

-- CreateIndex
CREATE INDEX "BlockedSpace_spaceNumber_idx" ON "BlockedSpace"("spaceNumber");
