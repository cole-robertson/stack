import { updateServerUser } from "@/lib/users";
import { createCrudHandlers } from "@/route-handlers/crud-handler";
import { KnownErrors } from "@stackframe/stack-shared";
import { currentUserCrud } from "@stackframe/stack-shared/dist/interface/crud/current-user";

export const currentUserCrudHandlers = createCrudHandlers(currentUserCrud, {
  paramNames: [],
  async onRead({ auth }) {
    return auth?.user ?? null;
  },
  async onUpdate({ auth, data }) {
    const userId = auth?.user?.id;
    const projectId = auth?.project.id;
    if (!projectId || !userId) throw new KnownErrors.UserNotFound();

    const user = await updateServerUser(
      projectId,
      userId,
      data,
    );
    if (!user) throw new KnownErrors.UserNotFound();
    return user;
  },
});
