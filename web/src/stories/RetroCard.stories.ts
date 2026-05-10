import type { Meta, StoryObj } from "@storybook/vue3";
import RetroBadge from "../components/retro/RetroBadge.vue";
import RetroCard from "../components/retro/RetroCard.vue";

const meta: Meta<typeof RetroCard> = {
  title: "Retro/RetroCard",
  component: RetroCard,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof RetroCard>;

export const Basic: Story = {
  render: () => ({
    components: { RetroBadge, RetroCard },
    template: `
      <div class="w-[360px]">
        <RetroCard title="About Me">
          <template #actions>
            <RetroBadge tone="pink">new</RetroBadge>
          </template>
          <p class="text-sm leading-6 text-gitkut-muted">
            A white card with soft blue borders, compact spacing, and a small
            hard shadow for that cleaned-up social web feeling.
          </p>
        </RetroCard>
      </div>
    `,
  }),
};
