import type { Meta, StoryObj } from "@storybook/vue3";
import GitkutProfilePageSkeleton from "../components/gitkut/GitkutProfilePageSkeleton.vue";

const meta: Meta<typeof GitkutProfilePageSkeleton> = {
  title: "Pages/GitkutProfilePageSkeleton",
  component: GitkutProfilePageSkeleton,
};

export default meta;
type Story = StoryObj<typeof GitkutProfilePageSkeleton>;

export const Default: Story = {
  args: {
    authenticated: true,
    username: "teles",
  },
};
