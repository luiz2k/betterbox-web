"use client";

import Button from "../../Button/Button";
import Image from "next/image";
import DropDown from "../../DropDown";
import { MessageCircleMore, CircleEllipsis, Trash2 } from "lucide-react";
import useMovieComments from "./useMovieComments";

import type { MovieCommentsProps } from "./MovieComment.d";

const MovieComments = ({
  movieComments,
  movieId,
  apiBaseURL,
}: MovieCommentsProps) => {
  const {
    errors,
    handleDeleteComment,
    handleFormSubmit,
    register,
    handleSubmit,
    session,
    commented,
  } = useMovieComments({
    movieComments,
    movieId,
    apiBaseURL,
  });

  return (
    <section className="space-y-5 rounded bg-color-3/10 p-2">
      <header>
        <h2 className="text-center text-xl font-bold uppercase">Comentários</h2>
      </header>

      {session && (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-2">
          <div className="flex flex-col">
            <label htmlFor="comment" className="text-lg font-bold">
              Fazer comentário
            </label>
            <textarea
              disabled={!!commented}
              id="comment"
              {...register("comment")}
              className="resize-none rounded p-1 disabled:bg-color-3/15"
            />
            {errors.comment?.message && (
              <p className="text-red-500">{errors.comment.message}</p>
            )}
          </div>

          {!commented ? (
            <div className="flex justify-end">
              <Button
                leftIcon={<MessageCircleMore />}
                theme="grayFill"
                textColor="white"
                type="submit"
              >
                Enviar
              </Button>
            </div>
          ) : (
            <p className="text-end text-color-3">
              Você já comentou esse filme.
            </p>
          )}
        </form>
      )}

      {movieComments.data?.length ? (
        <>
          {movieComments.data?.map((comment) => (
            <article
              key={comment.user.id + comment.commentedAt}
              className="overflow-hidden p-2 duration-200 hover:bg-color-3/5"
            >
              {comment.user.id === session?.user.id && (
                <div className="flex justify-end gap-1">
                  <DropDown.Root leftIcon={<CircleEllipsis size={15} />}>
                    <DropDown.Option
                      leftIcon={<Trash2 size={15} />}
                      cursor="default"
                      fontSize="normal"
                      onClick={() => handleDeleteComment(movieId)}
                    >
                      Apagar
                    </DropDown.Option>
                  </DropDown.Root>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2">
                <div className="size-10">
                  <Image
                    src={comment.user.picture || "/defaultAvatar.jpg"}
                    width={40}
                    height={40}
                    alt="Avatar"
                    className="size-10 rounded-full"
                  />
                </div>

                <div>
                  <div className="flex gap-2">
                    <p className="text-color-3">@{comment.user.username}</p>
                    <p className="text-color-3">{comment.commentedAt}</p>
                  </div>
                  <p>{comment.comment}</p>
                </div>
              </div>
            </article>
          ))}
        </>
      ) : (
        <p className="text-center uppercase text-color-3">
          Nenhum comentário foi encontrado
        </p>
      )}
    </section>
  );
};

export default MovieComments;
