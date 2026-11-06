import type { Metadata } from "next"
import { posts } from "@/data/posts"
import { TranslationComparison } from "@/components/articles/what-makes-app-slop/translation-comparison"

const post = posts.find((item) => item.href === "/writing/what-makes-app-slop")!

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: "/writing/what-makes-app-slop" },
}

export default function PostPage() {
  return (
    <article className="flex flex-col gap-6">
      <header className="flex flex-col gap-3">
        <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">What Actually Makes an App Slop?</h1>
        <time dateTime="2026-11-05" className="text-xs text-muted-foreground">2026-11-05</time>
      </header>
      <p className="text-base leading-8 text-foreground/85">{"There is a recognizable kind of app design that attracts the label "}<em>AI slop</em>{". A soft gradient, rounded cards with a lifting hover effect, ALL-CAPS EYEBROW HEADERS, and other calling cards of Claude. It is tempting to decide that aesthetic choices are the problem, but a lot of these interfaces aren't actually ugly. "}</p>
      <p className="text-base leading-8 text-foreground/85">{"A rounded card isn't broken. Neither is a standard layout. An unfamiliar style isn't automatically better but we get tired of seeing the same thing too many times. If we're going to call an app slop, we should be pointing to more than just a CSS file and some layout choices."}</p>
      <p className="text-base leading-8 text-foreground/85">{"Imagine an app for saving links. After pocket was discontinued this became one of the most common AI projects to tweet about. In a short demo or screenshot you can type a URL, see a preview, click Save. It's a wonderful \"happy path\" that makes you wonder why the old version cost so much to maintain when these took under an hour and have 90% of the functionality. Then you see another one. And another. They're all 90% of the original. They have most of the features, most of the platform support, and they're only missing 10% of that thoughtful UX touch. That last 10% is the line between a real app and slop. "}</p>
      <h2 className="mt-8 font-serif text-2xl font-semibold tracking-tight">{"AI's different view of utilitarianism"}</h2>
      <p className="text-base leading-8 text-foreground/85">{"It has been pretty well documented that most AI coding models have a set of fall-backs that come out whenever the prompt is ambiguous. These have affectionately been called \"Claude-isms\" and fall in the same bucket as em dashes - though many human writers love them - and colons. But it's not the model, it's the prompt. (see what I did there?) "}</p>
      <p className="text-base leading-8 text-foreground/85">{"These slop interfaces are utilitarian, but not in the way that word is commonly used. The over designed slop we see on Twitter doesn't evoke the minimalism usually associated with utilitarianism ideas, but the distinction is more about effort. Utilitarian interfaces are put together with the least effort possible but fulfill the exact task they need to. In this day and age where code is cheap, the most complexity is found in simplicity. "}</p>
      <p className="text-base leading-8 text-foreground/85">{"When working with my own agents designing frontend, the majority of the time is spent ripping out content and pruning the interface like a bonsai tree. Much of this work can be slipped into a system prompt, skill, or AGENTS.md but no matter what you do a section header will appear with AN ALL CAPS EYEBROW. "}</p>
      <p className="text-base leading-8 text-foreground/85">{"Making decisions like this will remain a human task much longer than manipulating the code itself. One day in the far off future, Anthropic will train Claude to have perfect taste and our jobs will be gone. I'm not too interested in those future speculations, but I'm very interested in the apps we make today and how users use them."}</p>
      <h2 className="mt-8 font-serif text-2xl font-semibold tracking-tight">{"State is not a screenshot"}</h2>
      <p className="text-base leading-8 text-foreground/85">{"No Twitter demo is going to cover every possible state of an application. There are all sorts of failure states and edge cases with each of those states leading far away from that initial demo. This matters for AI-assisted development. One-shot prompts are great at establishing perfect scenarios, but when you're moving that fast you miss the edge cases. More prompting can help, but you're never going to get something good enough without a clear vision of what you want. "}</p>
      <p className="text-base leading-8 text-foreground/85">{"What a prompt does on a fundamental level is reduce an idea down to a list of its most basic features. Try as you like, a one shot prompt can never capture the full experience of using a product or fully communicate what's supposed to be special about it. Think of it like translating from Spanish to English. Spanish has a million ways to express love, but when moving to English it usually gets lumped under the phrase \"I love you\" without too much thought. Even if a translator has a sense of nuance or context, the English versions of those phrases just don't feel quite right."}</p>
      <TranslationComparison />
      <p className="text-base leading-8 text-foreground/85">{"In "}<a href="https://arxiv.org/html/2607.22928v2" className="underline underline-offset-4 decoration-muted-foreground/50 hover:decoration-foreground" target="_blank" rel="noopener noreferrer">*Design Theater*</a>{", Imteyaz and colleagues evaluated 120 generated interfaces. They reported a gap between the explanations systems gave and what their implementations did, especially on functional tasks. While not a sample of production apps, the restricted generation setups show a clear disparity between prompt and product."}</p>
      <p className="text-base leading-8 text-foreground/85">{"If our prompts are fundamentally disconnected from our ideas and AI's implementations drift from the prompt anyway, the apps we code may only match our desires superficially. It becomes an even bigger problem when the standard way of verifying the completeness of an app is using vision-enabled models with screenshots and browser tools. Using these automated verification tools when training models or creating software will make overcoming the biases much more difficult."}</p>
      <p className="text-base leading-8 text-foreground/85">{"AI design is not ready. It needs human oversight, clear instructions, and solid product decisions to clear any sort of quality bar. Try as we might, automated systems as they currently stand cannot verify UX. That intangible human experience is too unique to generate. Have some standards. Respect your users. Don't settle for slop."}</p>
    </article>
  )
}
