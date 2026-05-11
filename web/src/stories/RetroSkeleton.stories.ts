import type { Meta, StoryObj } from "@storybook/vue3";
import RetroCard from "../components/retro/RetroCard.vue";
import RetroSkeleton from "../components/retro/RetroSkeleton.vue";

const meta: Meta<typeof RetroSkeleton> = {
  title: "Retro/RetroSkeleton",
  component: RetroSkeleton,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof RetroSkeleton>;

export const Shapes: Story = {
  render: () => ({
    components: { RetroCard, RetroSkeleton },
    template: `
      <div class="w-[360px]">
        <RetroCard title="Loading Bits">
          <div class="space-y-3">
            <RetroSkeleton class="h-20 w-20" rounded="xl" />
            <RetroSkeleton class="h-5 w-full" rounded="full" />
            <RetroSkeleton class="h-5 w-10/12" rounded="full" />
            <RetroSkeleton class="h-12 w-full" rounded="lg" />
          </div>
        </RetroCard>
      </div>
    `,
  }),
};
