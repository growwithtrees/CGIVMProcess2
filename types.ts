
export interface Panel {
  id: number;
  title: string;
  tag?: string;
  type: 'video' | 'text';
  imageUrl?: string;
  videoUrl?: string;
  text: string;
  isVisited: boolean;
  bgColor?: string;
}

export type View = 'intro' | 'hub' | 'content' | 'finish';
