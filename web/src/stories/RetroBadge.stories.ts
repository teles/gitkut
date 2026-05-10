import type { Meta, StoryObj } from "@storybook/vue3";
import RetroBadge from "../components/retro/RetroBadge.vue";

const meta: Meta<typeof RetroBadge> = {
  title: "Retro/RetroBadge",
  component: RetroBadge,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof RetroBadge>;

export const Tones: Story = {
  render: () => ({
    components: { RetroBadge },
    template: `
      <div class="flex flex-wrap gap-2">
        <RetroBadge tone="pink">#retro-web</RetroBadge>
        <RetroBadge tone="blue">TypeScript</RetroBadge>
        <RetroBadge tone="yellow">Ship It</RetroBadge>
        <RetroBadge tone="gray">Fork</RetroBadge>
      </div>
    `,
  }),
};
