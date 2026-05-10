import type { Meta, StoryObj } from "@storybook/vue3";
import RetroButton from "../components/retro/RetroButton.vue";

const meta: Meta<typeof RetroButton> = {
  title: "Retro/RetroButton",
  component: RetroButton,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof RetroButton>;

export const Variants: Story = {
  render: () => ({
    components: { RetroButton },
    template: `
      <div class="flex flex-wrap gap-3">
        <RetroButton>Primary</RetroButton>
        <RetroButton variant="secondary">Secondary</RetroButton>
        <RetroButton variant="ghost">Ghost</RetroButton>
      </div>
    `,
  }),
};
