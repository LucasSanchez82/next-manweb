import Image from "next/image"
import HeadingText from "@/components/heading-text"
import { features } from "@/config/contents"
import { FileSearch } from "lucide-react"
// import { Icons } from "@/components/icons"

export default function Features() {
  return (
    <section className="container space-y-8 py-12 lg:py-20" id="features">
      {features.header || features.subheader ? (
        <HeadingText subtext={features.subheader} className="text-center">
          {features.header}
        </HeadingText>
      ) : null}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="grid grid-cols-1 gap-8">
          {features.content.map((cards) => {
            return (
              <div
                key={cards.text}
                className="flex flex-col items-center gap-2 text-center md:flex-row md:gap-8 md:text-left"
              >
                <div className="flex justify-end items-center h-full" >
                  {cards.icon}
                </div>
                <div className="flex-1">
                  <p className="md:text4xl text-2xl font-semibold">
                    {cards.text}
                  </p>
                  <p className="font-light text-muted-foreground md:text-lg">
                    {cards.subtext}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
        <div
          className="md:border"
          style={{
            backgroundImage: `url(${features.image})`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: `cover`,
            backgroundPositionX: `center`,
            backgroundPositionY: `center`,
          }}
        ></div>
      </div>
    </section>
  )
}
