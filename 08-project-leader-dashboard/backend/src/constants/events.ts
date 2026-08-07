export enum ScoreEventReason {
    POST_LIKE = 'POST_LIKE',
    POST_VIEW = 'POST_VIEW',
    POST_CREATE = 'POST_CREATE',
}

export const SCORE_EVENT_POINTS_MAP: Record<ScoreEventReason, number> = {
    [ScoreEventReason.POST_LIKE]: 1,
    [ScoreEventReason.POST_VIEW]: 0.1,
    [ScoreEventReason.POST_CREATE]: 5,
}
