import React, { useEffect, useState } from 'react';

type DefendantPost = {
  defenseId: string;
  postId: string;
  caseId: string;
  defenseText: string;
  authorUsername: string;
  timestamp: number;
  votes: {
    guilty: number;
    notGuilty: number;
    totalVotes: number;
    votingClosed: boolean;
  };
};

type JudgePanelProps = {
  onBackToRoleSelection: () => void;
  onSelectDefendantPost: (postId: string) => void;
};

export const JudgePanel: React.FC<JudgePanelProps> = ({
  onBackToRoleSelection,
  onSelectDefendantPost,
}) => {
  const [defendantPosts, setDefendantPosts] = useState<DefendantPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDefendantPosts = async () => {
      try {
        const response = await fetch('/api/defendant-posts');
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        if (data.type === 'defendant_posts') {
          setDefendantPosts(data.defendantPosts);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (err) {
        console.error('Failed to fetch defendant posts:', err);
        setError(err instanceof Error ? err.message : 'Failed to load defendant posts');
      } finally {
        setLoading(false);
      }
    };

    fetchDefendantPosts();
  }, []);

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days}d ago`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-900 to-orange-900 flex items-center justify-center">
        <div className="text-white text-2xl animate-pulse">
          Loading defendant posts...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-900 to-orange-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="mb-4">{error}</p>
          <button
            onClick={onBackToRoleSelection}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Back to Role Selection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-900 to-orange-900">
      {/* Header */}
      <div className="bg-black bg-opacity-30 p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <button
            onClick={onBackToRoleSelection}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-white">Judge Panel</h1>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 max-w-4xl mx-auto">
        {defendantPosts.length === 0 ? (
          <div className="text-center text-white py-12">
            <h2 className="text-2xl font-bold mb-4">No Cases Available</h2>
            <p className="text-lg mb-6">
              There are no defendant posts available for voting at the moment.
            </p>
            <p className="text-gray-300">
              Check back later when defendants have submitted their defenses!
            </p>
          </div>
        ) : (
          <>
            <div className="text-center text-white mb-8">
              <h2 className="text-2xl font-bold mb-2">Cases Awaiting Your Verdict</h2>
              <p className="text-gray-300">
                Click on any case to review the defense and cast your vote
              </p>
            </div>

            <div className="grid gap-4">
              {defendantPosts.map((post) => (
                <div
                  key={post.defenseId}
                  className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 hover:bg-opacity-20 transition-all duration-300 cursor-pointer border border-white border-opacity-20"
                  onClick={() => onSelectDefendantPost(post.postId)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">
                        Defense by u/{post.authorUsername}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Case ID: {post.caseId} • {formatTimeAgo(post.timestamp)}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">
                        {post.votes.totalVotes} votes
                      </div>
                      <div className="text-sm text-gray-300">
                        {post.votes.votingClosed ? 'Voting Closed' : 'Active'}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-white line-clamp-3">
                      "{post.defenseText}"
                    </p>
                  </div>

                  {post.votes.totalVotes > 0 && (
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-white">
                          Guilty: {post.votes.guilty}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-white">
                          Not Guilty: {post.votes.notGuilty}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 text-right">
                    <span className="text-blue-300 hover:text-blue-200 font-semibold">
                      Click to Vote →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
