const WhatsAppButton = () => {
  return (
      <div className="fixed bottom-10 right-10 cursor-pointer">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
        <a href="https://api.whatsapp.com/send?phone=351935030016&text=Ol%C3%A1!%20Tenho%20interesse%20nos%20vossos%20produtos,%20gostava%20de%20mais%20informa%C3%A7%C3%B5es.">
          <img src="/images/whatsapp.svg" alt="whatsapp" />
        </a>
      </div>
    )
}

export default WhatsAppButton;
