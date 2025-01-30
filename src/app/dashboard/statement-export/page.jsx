"use client"
import Container from "@/components/Container/Container";
import StatementExportBody from "@/components/Statement-Export/StatementExportBody";

export default function StatementExportPage() {

  return (
    <Container pageName={"Company Management"}>
      <StatementExportBody />
    </Container>
  );
}