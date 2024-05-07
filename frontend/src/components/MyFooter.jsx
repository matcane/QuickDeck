import { Footer, FooterCopyright, FooterDivider } from "flowbite-react";

export function MyFooter() {
  return (
    <Footer container bgDark>
      <div className="w-full text-center">
        <FooterDivider />
        <FooterCopyright by="QuickDeck™" year={2024} />
      </div>
    </Footer>
  );
}
