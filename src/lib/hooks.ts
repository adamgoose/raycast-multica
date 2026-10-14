import { useCachedPromise, useCachedState } from "@raycast/utils";
import { getMe, listAgents, listIssueStatuses, listMembers, listWorkspaces } from "./api";
import { getCredentials } from "./config";
import type { Agent, IssueStatus, Member, User, Workspace } from "./types";

// Errors surface through the returned `error` instead of a toast.
const ignoreError = () => undefined;

function preferredWorkspaceId(): string | undefined {
  try {
    return getCredentials().workspaceId;
  } catch {
    return undefined;
  }
}

/** The workspace list plus the selected workspace, shared across commands. */
export function useWorkspace() {
  const { data: workspaces, isLoading, error } = useCachedPromise(listWorkspaces, [], { onError: ignoreError });
  const [selectedId, setWorkspaceId] = useCachedState<string | undefined>("workspace-id", undefined);

  const workspace =
    workspaces?.find((w) => w.id === selectedId) ??
    workspaces?.find((w) => w.id === preferredWorkspaceId()) ??
    workspaces?.[0];

  return { workspaces, workspace, setWorkspaceId, isLoading, error };
}

export interface WorkspaceContext {
  workspace: Workspace;
  me?: User;
  members?: Member[];
  agents?: Agent[];
  statuses?: IssueStatus[];
}

/** People, agents, and statuses for a workspace, used to label issues. */
export function useWorkspaceContext(workspace: Workspace | undefined) {
  const id = workspace?.id ?? "";
  const execute = Boolean(workspace);

  const me = useCachedPromise(getMe, [], { onError: ignoreError });
  const members = useCachedPromise(listMembers, [id], { execute });
  const agents = useCachedPromise(listAgents, [id], { execute });
  const statuses = useCachedPromise(listIssueStatuses, [id], { execute });

  const context: WorkspaceContext | undefined = workspace
    ? { workspace, me: me.data, members: members.data, agents: agents.data, statuses: statuses.data }
    : undefined;

  return {
    context,
    isLoading: me.isLoading || members.isLoading || agents.isLoading || statuses.isLoading,
    revalidateAgents: agents.revalidate,
  };
}
