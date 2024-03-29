import type { DestinyCharacterComponent } from 'bungie-api-ts/destiny2';

export default defineStore('activities', () => {
    const reports = useReportStore();
    const abortcontroller = useAbortController();

    const activityCount = ref(0);

    const loadings = ref<string[]>([]);
    const removeLoading = (characterId: string) => {
        loadings.value = loadings.value.filter(i => i !== characterId);
    };
    const done = computed(() => !loadings.value.length);

    const load = (characters: DestinyCharacterComponent[]) => {
        activityCount.value = 0;

        loadings.value.push(...characters.map(c => c.characterId));
        for (const character of characters) {
            loadCharacter(character, 0);
        }
    };

    const loadCharacter = async (character: DestinyCharacterComponent, page: number) => {
        const res = await Promise.all(
            new Array(3)
                .fill(undefined)
                .map((_, i) =>
                    getActivityHistory(
                        character.membershipId,
                        character.membershipType,
                        character.characterId,
                        abortcontroller.signal,
                        page + i
                    )
                )
        );

        const acts = res
            .map(r => r.Response.activities)
            .filter(a => !!a)
            .flat(1);

        if (!acts.length) {
            removeLoading(character.characterId);
            return;
        }

        for (const act of acts) {
            reports.fetchReport(act.activityDetails.instanceId);
        }

        activityCount.value += acts.length;
        loadCharacter(character, page + 3);
    };

    return { load, activityCount, done };
});
