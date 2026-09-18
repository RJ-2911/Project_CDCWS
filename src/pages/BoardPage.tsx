import { ArrowLeft, Globe, Lock, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Editor } from "@tldraw/tldraw";
import { deleteBoard, getBoard, updateBoardVisibility } from "@/lib/boards-api";
import { BoardCanvas } from "@/features/canvas/BoardCanvas";
import { ShareTray } from "@/features/share/ShareTray";
import { BoardTitle } from "@/features/canvas/BoardTitle";
import { CommunityPicker } from "@/features/community/CommunityPicker";
import { VoiceBar } from "@/features/voice/VoiceBar";
import { DrawgonLoader } from "@/components/DrawgonLoader";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { Board } from "@shared/board";

export function BoardPage() {
  const { boardId } = useParams<{ boardId: string }>();
  const [board, setBoard] = useState<Board | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [togglingVisibility, setTogglingVisibility] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editor, setEditor] = useState<Editor | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!boardId) return;
    getBoard(boardId)
      .then(setBoard)
      .catch(() => setError("Board not found."));
  }, [boardId]);

  async function togglePublish() {
    if (!board || togglingVisibility) return;
    setTogglingVisibility(true);
    try {
      const nextVisibility =
        board.visibility === "public" ? "private" : "public";
      const updated = await updateBoardVisibility(board.id, nextVisibility);
      setBoard(updated);
    } finally {
      setTogglingVisibility(false);
    }
  }

  async function handleDelete() {
    if (!board || deleting) return;
    if (!window.confirm(`Delete “${board.title}”? This cannot be undone.`))
      return;
    setDeleting(true);
    try {
      await deleteBoard(board.id);
      navigate("/");
    } finally {
      setDeleting(false);
    }
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p className="text-neutral-500">{error}</p>
        <Link to="/" className="text-sm underline">
          Back to boards
        </Link>
      </div>
    );
  }

  if (!board) {
    return <DrawgonLoader label="Loading board..." />;
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex shrink-0 items-center justify-between border-b border-neutral-200 px-4 py-2 dark:border-neutral-800">
        <div className="flex items-center gap-1">
          <Link
            to="/"
            aria-label="Back to my boards"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-200/70 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
          >
            <ArrowLeft size={16} />
          </Link>
          <BoardTitle
            boardId={board.id}
            title={board.title}
            onRenamed={(title) => setBoard({ ...board, title })}
          />
          <span className="text-neutral-300 dark:text-neutral-700">|</span>
          <button
            type="button"
            onClick={() => void togglePublish()}
            disabled={togglingVisibility}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-neutral-600 transition hover:bg-neutral-200/70 hover:text-neutral-900 disabled:opacity-50 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
          >
            {board.visibility === "public" ? (
              <Globe size={13} />
            ) : (
              <Lock size={13} />
            )}
            {board.visibility === "public"
              ? "Public — make private"
              : "Private — publish to community"}
          </button>
          {board.visibility === "public" && (
            <CommunityPicker
              boardId={board.id}
              communityId={board.communityId}
              onChange={(communityId) => setBoard({ ...board, communityId })}
            />
          )}
          <button
            type="button"
            onClick={() => void handleDelete()}
            disabled={deleting}
            aria-label="Delete board"
            title="Delete board"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition hover:bg-red-100 hover:text-red-600 disabled:opacity-50 dark:text-neutral-500 dark:hover:bg-red-500/15 dark:hover:text-red-400"
          >
            <Trash2 size={15} />
          </button>
        </div>
        <ThemeToggle />
      </div>
      <div className="relative flex-1 overflow-hidden">
        <BoardCanvas
          boardId={board.id}
          initialSnapshot={board.snapshot}
          onEditorReady={setEditor}
        />
        <VoiceBar boardId={board.id} />
      </div>
      <ShareTray editor={editor} title={board.title} />
    </div>
  );
}
