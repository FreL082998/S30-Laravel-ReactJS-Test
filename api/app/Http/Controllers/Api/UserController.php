<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\BaseApiController;
use App\Http\Requests\GetUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\Role;
use App\Models\User;

class UserController extends BaseApiController
{
    /**
     * Display a listing of the resource.
     *
     * @param  \App\Http\Requests\GetUserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function index(GetUserRequest $request)
    {
        $users = User::with('roles')->latest()->get();
        return UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreUserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        $user = User::create([
            'name' => $request->full_name,
            'email' => $request->email, 
        ]);

        $roles = Role::whereIn('name', $request->roles)->get();
        $user->roles()->sync($roles->pluck('id'));

        return new UserResource($user->load('roles'));
    }

    /**
     * Display the specified resource.
     *
     * @param  User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return new UserResource($user->load('roles'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateUserRequest  $request
     * @param  User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $user->update([
            'name'  => $request->full_name,
            'email' => $request->email,
        ]);

        $roles = Role::whereIn('name', $request->roles)->get();
        $user->roles()->sync($roles->pluck('id'));

        return new UserResource($user->load('roles'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->roles()->detach();
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

    public function byRole(string $roleName)
    {
        $role = Role::where('name', $roleName)->firstOrFail();
        $users = $role->users()->with('roles')->get();

        return UserResource::collection($users);
    }
}
