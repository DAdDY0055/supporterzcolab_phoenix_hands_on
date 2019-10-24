defmodule HelloWeb.RoomChannel do
  use Phoenix.Channel

  def join("room:lobby", _message, socket) do
    {:ok, socket}
  end

  def join("room:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end

  # ここから
  def handle_in("new_msg", payload,  socket) do
    broadcast!(socket, "new_msg", payload)
    {:noreply, socket}
  end
  # ここまで追記
end
